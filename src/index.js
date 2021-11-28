import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './lib/DataTable';
import { employeList } from './employe';

ReactDOM.render(
    <React.StrictMode>
        <DataTable
            data={employeList}
            columns={[
                { title: 'First Name', data: 'firstName' },
                { title: 'Last Name', data: 'lastName' },
                { title: 'Start Date', data: 'startDate' },
                { title: 'Department', data: 'department' },
                { title: 'Date of Birth', data: 'dateOfBirth' },
                { title: 'Street', data: 'street' },
                { title: 'City', data: 'city' },
                { title: 'State', data: 'state' },
                { title: 'Zip Code', data: 'zipCode' },
            ]}
        />
    </React.StrictMode>,
    document.getElementById('root')
);
