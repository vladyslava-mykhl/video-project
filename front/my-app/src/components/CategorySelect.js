import axios from "axios";
import React, {useState, useEffect} from "react";
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {notification} from '../components/Toasts';

const CategorySelect = ({isSelectCategory, setIsSelectCategory}) => {
    const [categories, setCategories] = useState([]);
    let componentMounted = true;
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:3000/get-categories")
                .then(res => (componentMounted && setCategories(res.data)))
                .catch(e => notification('error', e))
        };
        fetchData();
        return () => {
            componentMounted = false;
        };
    }, []);
    return (
        <FormControl sx={{ m: 2, minWidth: 200}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isSelectCategory}
                label="Category"
                onChange={e => setIsSelectCategory(e.target.value)}
            >
                { categories?.map((category) =>
                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                )}
            </Select>
            {isSelectCategory && <IconButton onClick={() => setIsSelectCategory("")} aria-label="delete" size="small">
                <ClearIcon fontSize="inherit" />
            </IconButton> }
        </FormControl>
    );
};

export default CategorySelect;


