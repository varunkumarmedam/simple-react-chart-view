var datasets = {}
var finalDatasets = [];
var colors = ['#4A78EE', '#FF6D00', '#18CE40', '#EE4A78', '#17683B', '#F3FF38', '#9B18CE', '#38F3FF', '#173B68', '#C6C6C6']
var chartRef;
function ChartTable() {
    const { useState } = React
    const [tableData, setTableData] = useState([]);

    // Calling API only on first render
    // When chart.js component is created, avoid the render  
    if (!tableData.length) fetch(
        "http://fetest.pangeatech.net/data")
        .then((res) => res.json())
        .then((data) => {
            setTableData(data)
            setRecords(data)
        })
    return (
        <>
            <div className="table-content">
                <table className="table table-striped">
                    <thead className="table-header">
                        <tr>
                            <th>S no</th>
                            <th>Line of Business</th>
                            <th>Revenue Type</th>
                            <th>Product</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>ACV</th>
                            <th>TCV</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((record) => {
                            return (
                                <tr key={record.S_no}>
                                    <td>{record.S_no}</td>
                                    <td>{record.line_of_business}</td>
                                    <td>{record.revenue_type}</td>
                                    <td>{record.product}</td>
                                    <td>{record.year}</td>
                                    <td>{record.month}</td>
                                    <td>{record.acv}</td>
                                    <td>{record.tcv}</td>
                                    <td>{record.revenue}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}


function setRecords(data) {

    // Converting raw data to custom datasets
    for (const index in data) {
        if (!datasets[data[index]['revenue_type']])
            datasets[data[index]['revenue_type']] = {};

        if (!datasets[data[index]['revenue_type']][data[index]['month']])
            datasets[data[index]['revenue_type']][data[index]['month']] = 0;

        datasets[data[index]['revenue_type']][data[index]['month']] += data[index]['acv']
    }

    // Merging all datasets generated sofar
    for (const key in datasets) {
        let temp = {}
        temp.label = key;
        temp.data = [];
        temp.data.push(datasets[key]['January'] ?? 0)
        temp.data.push(datasets[key]['February'] ?? 0)
        temp.data.push(datasets[key]['March'] ?? 0)
        temp.data.push(datasets[key]['April'] ?? 0)
        temp.data.push(datasets[key]['May'] ?? 0)
        temp.data.push(datasets[key]['June'] ?? 0)
        temp.data.push(datasets[key]['July'] ?? 0)
        temp.data.push(datasets[key]['August'] ?? 0)
        temp.data.push(datasets[key]['September'] ?? 0)
        temp.data.push(datasets[key]['October'] ?? 0)
        temp.data.push(datasets[key]['November'] ?? 0)
        temp.data.push(datasets[key]['December'] ?? 0)
        temp.borderColor = colors.pop();
        temp.backgroundColor = temp.borderColor;
        finalDatasets.push(temp)
    }

    // Generating Actual Chart
    if (!chartRef)
        chartRef = new Chart(
            document.getElementById('myChart'),
            config
        );


}

// Chart.js utils
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const data = {
    labels: labels,
    datasets: finalDatasets
};

const config = {
    type: 'line',
    data: data,
};

ReactDOM.createRoot(document.getElementById('chartTable')).render(<ChartTable />)