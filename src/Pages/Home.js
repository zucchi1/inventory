import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>Home</h1>
            <div className="button-row">
                <button className="btn btn-outline" onClick={() => navigate('/shop')}>店舗追加</button>
                <button className="btn btn-outline" onClick={() => navigate('/product')}>商品追加</button>
                <button className="btn btn-outline" onClick={() => navigate('/inventory')}>在庫登録</button>
                <button className="btn btn-outline" onClick={() => navigate('/table')}>在庫一覧</button>
            </div>
        </div>
    )
}
export default Home;