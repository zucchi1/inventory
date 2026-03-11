import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function AddShop() {
    const [shopName, setShopName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!shopName) return;
        const { error } = await supabase.from("shops").insert([{ name: shopName }]);
        if (error) {
            setMessage("登録に失敗しました: " + error.message);
        } else {
            setMessage("店舗を追加しました！");
            setShopName("");
        }
    };

    return (
        <div className="container">
            <h1>店舗追加</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="shopName">店舗名:</label>
                <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={shopName}
                    onChange={e => setShopName(e.target.value)}
                    required
                />
                <br />
                <button type="submit" className="btn btn-outline">追加</button>
            </form>
            {message && <p className="muted">{message}</p>}
            <div style={{marginTop:'1rem'}}>
              <button className="btn btn-inline" onClick={() => window.history.back()}>戻る</button>
            </div>
        </div>
    );
}
export default AddShop;