

function SupTable({sup}) {


    return (

        <form onSubmit={(e) => {
            e.preventDefault()
            sup()
        }}>
            <label>Supprimer</label>
            <input type="submit" value="Supprimer" />
        </form>
    )
}
function Form({ addTable }) {

    const [title, setTitle] = React.useState('')



    return <form onSubmit={(e) => {
        e.preventDefault()
        addTable(title)
    }}>
        <label>Titre</label>
        <input onChange={(e) => {
            setTitle(e.target.value);
        }} type='text' />
        <input type="submit" value="envoyer" />
    </form>


}

function Table({ data }) {


    return <div className="table">

        <h3>{data.titre}</h3>


    </div>


}

function Container() {

    const [tables, setTables] = React.useState([{
        id: 1,
        titre: 'titre1'

    },
    {
        id: 2,
        titre: 'titre1'
    },
    {
        id: 3,
        titre: 'titre1'
    },
    {
        id: 4,
        titre: 'titre1'
    }])

    function addTable(title) {

        let newTables = [...tables];

        newTables.push({
            id: tables.length + 1,
            titre: title
        })


        setTables(newTables);
    }


    function sup ()  {


        let newTables = [...tables];
        newTables.pop();
        setTables(newTables)
        
    }

    console.log(tables);

    return <div className="container" >

        <Form addTable={addTable} />
        <SupTable  sup={sup} />
        {tables.map((table, index) => {

            return <Table key={index} data={table}  />
        })}

    </div>
}






ReactDOM.render(<Container />, document.getElementById('root'))
