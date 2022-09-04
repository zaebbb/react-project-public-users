import React from 'react';

const Admin = () => {
    return (
        <div>
            <h1>Приветсвуем вас, администратор</h1>
            <a type="button" href="/createFigure" className="btn btn-outline-dark">Создать новую публичную личность</a>
        </div>
    );
};

export default Admin;
