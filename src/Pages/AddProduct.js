import React, { useState } from "react";
import { supabase } from "../supabaseClient";
function AddProduct(){
        const [productName, setProductName] = useState("");
        const [productPrice, setProductPrice] = useState("");
        const [message, setMessage] = useState("");
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage("");
            if (!productName || !productPrice) return;
            const { error } = await supabase.from("products").insert([{ name: productName, price: parseFloat(productPrice) }]);
            if (error) {
                setMessage("登録に失敗しました: " + error.message);
            } else {
                setMessage("商品を追加しました！");
                setProductName("");
                setProductPrice("");
            }
        };
        return (
        <div>
            <h1>商品追加</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="productName">商品名:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="productPrice">価格:</label>
                <input
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    value={productPrice}
                    onChange={e => setProductPrice(e.target.value)}
                    required
                />
                <br />
                <input type="submit" value="追加" />
            </form>
            {message && <p>{message}</p>}
            <button className="btn-inline" onClick={() => window.history.back()}>戻る</button>
        </div>
        );
}
export default AddProduct;