
function Header() {
    const { useState } = React
    const [name, setName] = useState("Jhon Carter");

    return (
        <div className = "header"><h1>Hello {name},</h1></div>
    );
}

ReactDOM.createRoot(document.getElementById('appHeader')).render(<Header />)