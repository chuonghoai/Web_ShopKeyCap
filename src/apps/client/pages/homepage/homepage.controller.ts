import { useEffect, useState } from "react"

export const useHomepageController = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems([
            { id: '1', name: 'CyberBoard R3', price: '9,500,000đ', image: 'https://tse3.mm.bing.net/th/id/OIP.QjIBrvAWKITAkoO2kmIKqgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', badge: 'New' },
            { id: '2', name: 'Keychron Q1 Pro', price: '4,200,000đ', image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/keychronq1pro4-1673855880953.jpg?v=1673855883' },
            { id: '3', name: 'Tofu65 2.0', price: '3,800,000đ', image: 'https://tse1.mm.bing.net/th/id/OIP.uvrHGMa2ZCB_knf55yyT6QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', badge: 'Hot' },
            { id: '4', name: 'Zoom75 EE', price: '5,100,000đ', image: 'https://ucarecdn.com/e8e0dce8-1947-4fa0-8201-479412e48fc7/-/format/auto/-/preview/3000x3000/-/quality/lighter/Zoom75_EEWhite_eWhite.jpg' },
        ])
    }, []);

    return {
        items,
    }
}