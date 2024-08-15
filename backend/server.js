const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/category/:categoryName/products', async (req, res) => {
    console.log("Request received");
    const { categoryName } = req.params;
    let { minPrice, maxPrice, n } = req.query;

    const authorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzA2NTQ3LCJpYXQiOjE3MjM3MDYyNDcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE4N2ZjMWQ3LTlhOGYtNDQwNy1iYjc3LWI1YjdkZWQ0MTY4ZCIsInN1YiI6IjIxMzQxQTEyMzFAZ21yaXQuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkbWVkIiwiY2xpZW50SUQiOiJhODdmYzFkNy05YThmLTQ0MDctYmI3Ny1iNWI3ZGVkNDE2OGQiLCJjbGllbnRTZWNyZXQiOiJWR3dMb0hpaXNYWXh1R2xvIiwib3duZXJOYW1lIjoiQ0hJTk5JIEFNUlVUSEEgVkFNU0kiLCJvd25lckVtYWlsIjoiMjEzNDFBMTIzMUBnbXJpdC5lZHUuaW4iLCJyb2xsTm8iOiIyMTM0MUExMjMxIn0.rD4GQUnLkY1egu8RI3sqf-277LEArypjRgSxTa-wTFY';

    n = n ?? 10;
    minPrice = minPrice ?? 1;
    maxPrice = maxPrice ?? 999999;

    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const categories = [
        "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger",
        "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote",
        "Speaker", "Headset", "Laptop", "PC"
    ];

    if (!categories.includes(categoryName)) {
        return res.status(400).send({ error: 'Invalid category name' });
    }

    const dataList = [];

    for (let company of companies) {
        try {
          const externalApiUrl = `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
          const response = await axios.get(externalApiUrl, {
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`
                }
            });
            dataList.push(...response.data);
        } catch (e) {
            console.error(`Error fetching data from ${company}:`, e.message);
        }
    }

    dataList.sort((a, b) => b.rating - a.rating);

    const topProducts = dataList.slice(0, n);
    res.status(200).send(topProducts);
});

app.get('/getallbrands/:id', async (req, res) => {
    try {
        const data = await BrandName.findById(req.params.id);
        return res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});