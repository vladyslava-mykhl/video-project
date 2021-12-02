import axios from "axios";
import React, {useState, useEffect} from "react";

const CategorySelect = ({setValue, value}) => {
    const [category, setCategory] = useState();
        useEffect(async () => {
            axios.get("http://localhost:3000/get-categories")
                .then(res => {
                    setCategory(res.data)
                })
                .catch(err => {
                    console.log(err)
                });
        }, []);
    return (
        <>
            <select onChange={e => setValue(e.target.value)}>
                { !value  && <option selected >Choose a category</option>}
                {category?.map((category) => <option value={category._id}>{category.name}</option>
                )}
            </select>
        </>
    );
};

export default CategorySelect;