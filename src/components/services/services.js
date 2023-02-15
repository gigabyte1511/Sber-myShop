import { Product } from "../Product/Product";

export const sortData = (data, type)=>{
    const [...newMass] = data 
    switch (type) {
        case "Disable":
            return data.map((elem)=><Product params={elem} key={elem._id}/>)
        case "First expensive":
            newMass.sort((a,b) => ((b.price - (b.price * b.discount/100)) - (a.price- (a.price * a.discount/100))))
            return newMass.map((elem)=><Product params={elem} key={elem._id}/>)
        case "First cheap":
            newMass.sort((a,b) => ((a.price - (a.price * a.discount/100)) - (b.price- (b.price * b.discount/100))))
            return newMass.map((elem)=><Product params={elem} key={elem._id}/>)
        case "First new":
            newMass.sort((a,b) => (Date.parse(b.created_at) - Date.parse(a.created_at)))
            return newMass.map((elem)=><Product params={elem} key={elem._id}/>)
        default:
            break;
    }
}