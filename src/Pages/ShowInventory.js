import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ShowInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch inventory joined with shop and product (include product price)
        const { data, error } = await supabase
          .from("inventory")
          .select("id,quantity,date_added,shop_id,product_id,shops(name),products(name,price)")
          .order("date_added", { ascending: false });
        if (error) throw error;

        const all = data || [];
        // keep latest per shop_id + product_id per local date (data ordered desc)
        const map = new Map();
        for (const it of all) {
          const d = new Date(it.date_added);
          const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`;
          const key = `${it.shop_id}|${it.product_id}|${dateKey}`;
          if (!map.has(key)) map.set(key, it);
        }
        setItems(Array.from(map.values()));
      } catch (err) {
        setError(err.message || "Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container">
      <h1>在庫一覧</h1>
      {loading && <p className="muted">読み込み中…</p>}
      {error && <p style={{ color: "#c0392b" }}>{error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th style={{ padding: "0.75rem" }}>店舗</th>
                <th style={{ padding: "0.75rem" }}>商品</th>
                <th style={{ padding: "0.75rem" }}>数量</th>
                <th style={{ padding: "0.75rem" }}>価格</th>
                <th style={{ padding: "0.75rem" }}>更新日時</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "0.75rem" }}>
                    在庫データがありません
                  </td>
                </tr>
              )}
              {items.map((it) => {
                const shopName = Array.isArray(it.shops) ? it.shops[0]?.name : it.shops?.name;
                const product = Array.isArray(it.products) ? it.products[0] : it.products;
                const productName = product?.name ?? it.product_id;
                const productPrice = product?.price ?? null;
                return (
                  <tr key={it.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <td style={{ padding: "0.75rem" }}>{shopName ?? it.shop_id}</td>
                    <td style={{ padding: "0.75rem" }}>{productName}</td>
                    <td style={{ padding: "0.75rem" }}>{it.quantity}</td>
                    <td style={{ padding: "0.75rem" }}>{productPrice != null ? `¥${Number(productPrice).toFixed(0)}` : "-"}</td>
                    <td style={{ padding: "0.75rem" }}>{new Date(it.date_added).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            <div style={{marginTop:'1rem'}}>
              <button className="btn btn-inline" onClick={() => window.history.back()}>戻る</button>
            </div>
        </div>
        
      )}
    </div>
  );
}

export default ShowInventory;
