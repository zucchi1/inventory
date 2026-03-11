import { useState ,useEffect} from "react";
import { supabase } from "../supabaseClient";
function AddInventory(){

    const [shopName, setShopName] = useState("");
    const[shopId, setShopId] = useState("");
    const [shops, setShops] = useState([]);
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    // const [message, setMessage] = useState(""); // 未使用のため削除
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShopDefined, setIsShopDefined] = useState(false);
    useEffect(() => {
        const fetchShops = async () => {
            const { data, error } = await supabase.from("shops").select("*");
            if (error) {
                console.error("Error fetching shops:", error);
            } else {
                setShops(data);
            }
        };
        fetchShops();
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data);
            }
        };
        fetchProducts();
    }, []);

    const setShopNameAndId = (e) => {
        const selectedShopName = e.target.value;
        setShopName(selectedShopName);
        const selectedShop = shops.find((shop) => shop.name === selectedShopName);
        if (selectedShop) {
            setShopId(selectedShop.id);
        }
    };
    const setProductNameAndId = (e) => {
        const selectedProductName = e.target.value;
        setProductName(selectedProductName);
        const selectedProduct = products.find((product) => product.name === selectedProductName);
        if (selectedProduct) {
            setProductId(selectedProduct.id);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!shopName) return;
        setIsShopDefined(true);
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setMessage("");
        if (isSubmitting) return; // 既に送信中なら無視
        setIsSubmitting(true);
        const start = Date.now();
        try {
            const quantity = Number(e.target.quantity.value);
            if (!shopId || !productId || !quantity) {
                setMessage("店舗・商品・数量を正しく入力してください");
            } else {
                const { error } = await supabase.from("inventory").insert([{ shop_id: shopId, product_id: productId, quantity }]);
                if (error) {
                    setMessage("在庫登録に失敗しました: " + error.message);
                } else {
                    setMessage("在庫を登録しました！");
                }
            }
        } finally {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 1000 - elapsed);
            setTimeout(() => setIsSubmitting(false), remaining);
        }
    };

    return (
            <div className="container">
                <h1>在庫追加</h1>
                {!isShopDefined && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="shopName">店舗名を選択してください:</label>
                    <select
                        id="shopName"
                        name="shopName"
                        value={shopName}
                        onChange={setShopNameAndId}
                        required
                    >
                        <option value="">店舗を選択してください</option>
                        {shops.map((shop) => (
                            <option key={shop.id} value={shop.name}>
                                {shop.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit" className="btn btn-outline">決定</button>
                </form>
                )}

                {isShopDefined && (
                    <div>
                        <h2>在庫登録のフォーム（店舗ID: {shopName}）</h2>
                        <form onSubmit={handleSubmit2}>
                            {/* ここに在庫登録のフォームを実装してください */}
                            <label htmlFor="productName">商品名を選択してください:</label>
                            <select 
                                id="productName"
                                name="productName"
                                value={productName} required
                                onChange={setProductNameAndId}
                            >
                                <option value="">商品名を選択してください</option>
                                {products.map((product) => (
                                    <option key={product.id ?? product.name} value={product.name}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <label htmlFor="quantity">数量:</label>
                            <input type="number" id="quantity" name="quantity" required />
                            <br />
                            <button type="submit" className="btn btn-outline" disabled={isSubmitting}>
                                {isSubmitting ? '送信中…' : '在庫登録'}
                            </button>
                        </form>
                    </div>
                )}

            <div style={{marginTop:'1rem'}}>
                <button className="btn btn-inline" onClick={() => window.history.back()}>戻る</button>
            </div>
        </div>
        );
}
export default AddInventory;