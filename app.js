const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();


let CONTACTS = [
    {
        id: v4(), name: 'Denis', value: '8-916-777-916-8', marked: false
    }
]

app.use(express.json());

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS);
    }, 500);
}) 

// POST
app.post('/api/contacts', (req, res) => {
    
    const contact = { ...req.body, id: v4(), marked: false };
    CONTACTS.push(contact);
    res.status(201).json(contact);
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Контакт был удален'});
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex( c => c.id === req.params.id);
    CONTACTS[idx] = req.body;
    if (CONTACTS[idx].marked) {
        res.status(200).json({contact: CONTACTS[idx], message: 'Контакт был изменен'});
    }
    if (!CONTACTS[idx].marked) {
        res.status(200).json({contact: CONTACTS[idx], message: 'Контакт был возвращен'});
    }
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3131, () => console.log('Server has been started on port 3131...'))