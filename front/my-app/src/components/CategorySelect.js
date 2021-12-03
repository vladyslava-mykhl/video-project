import axios from "axios";
import React, {useState, useEffect} from "react";
import {errorToast} from '../components/Toasts'

const CategorySelect = ({isSelectCategory, setIsSelectCategory}) => {
    const [categories, setCategories] = useState([]);
    let componentMounted = true;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/get-categories")
                .then(res => (componentMounted && setCategories(res.data)))
                .catch(e => errorToast(e))
        }
        fetchData();
        return () => {
            componentMounted = false;
        }
    }, []);
    return (
        <>
            <select onChange={e => setIsSelectCategory(e.target.value)} value={isSelectCategory} >
                {categories?.map((category) => <option key={category._id} value={category._id}>{category.name}</option>
                )}
            </select>
        </>
    );
};

export default CategorySelect;