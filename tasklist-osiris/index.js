const fakeData = [
    {
      title: "title1",
      description: "description1",
      containerId: 1,
    },
    {
      title: "title2",
      description: "description2",
      containerId: 1,
    },
    {
      title: "title3",
      description: "description3",
      containerId: 0,
    },
  ];
  const fakeContainerData = [
    {
      title: "project Resources",
    },
    {
      title: "Sujets de la prochaine rénuion",
    },
    {
      title: "A faire",
    },
    {
      title: "xx x  xxx xx",
    },
  ];
  const [carteData, setCarteData] =
    useState<{ title: string; description: string; containerId: number }[]>(
      fakeData
    );
  const [displayForm, setDisplayForm] = useState(false);
  const [displayBox, setDisplayBox] = useState(false);
  const [storeGetById, setStoreGetById] = useState<number>();

  const addNewTask = (param: {
    title: string;
    description: string;
    containerId: number;
  }) => {
    setCarteData((prev) => [...prev, param]);
    setDisplayForm(false);
  };
  const getById= (param: number) => {
    setDisplayBox(true)
    setStoreGetById(param)
  };
  const updateTask = (param: {
    title: string;
    description: string;
    containerId: number;
  }) =>{
    const update = carteData.map((i, key) => {
        if(key === storeGetById){
             return {...i, title : param.title, description: param.description}
        }
        return i
    });
    setStoreGetById(undefined)
    setCarteData(update);
    setDisplayForm(false)
}
const update = () =>{
    setDisplayBox(false)
    setDisplayForm(true)
    console.log(storeGetById)
}
const delete_ = () =>{
    const update = carteData.filter((i, key) => key !== storeGetById);
    setCarteData(update);
    setStoreGetById(undefined)
    setDisplayBox(false)
}
const cancel = () =>{
    setStoreGetById(undefined)
    setDisplayBox(false)
}




  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        {fakeContainerData.map((i, key) => (
          <Container
            carteData={carteData}
            getById={getById}
            key={key}
            containerTitle={i.title}
            containerId={key}
          />
        ))}
      </div>
      {displayForm && <Form addNewTask={addNewTask} updateTask={updateTask} id={storeGetById} data = {carteData}/>}
      <button onClick={() => setDisplayForm(true)}>Add a new task</button>
      
      {displayBox && <DialogBox update={update} delete_={delete_} cancel={cancel}/>}
    </div>
  );
};
type TCarte = {
  title: string | boolean;
  description: string | boolean;
};
type TForm = {
  addNewTask: (param: {
    title: string;
    description: string;
    containerId: number;
  }) => void;

  updateTask: (param: {
    title: string;
    description: string;
    containerId: number;
  }) => void;

  id:number | undefined,
  data: { title: string; description: string; containerId?: number }[]
};
type TContener = {
  carteData: { title: string; description: string; containerId?: number }[];
  getById: (param: number) => void;
  containerTitle: string;
  containerId: number;
};
type TCheckboxSTM = {
  getId: (value: number) => void;
  data:{ title: string; description: string; containerId?: number } | undefined
};

type TDialogBox = {
    update : () => void;
    delete_ : () => void;
    cancel : () => void;
  };

const DialogBox = ({update,delete_,cancel}:TDialogBox ) =>{
    return(
        <div style={{border: "solid", display: "flex", gap: 10, justifyContent: "center", width: 400, margin: 'auto', paddingTop: 20, paddingBottom: 10}}>
            <div onClick={()=>update()} style={{border: "solid 1px", padding: 5, paddingLeft: 10, paddingRight: 10}}>Update</div>
            <div onClick={()=>delete_()} style={{border: "solid 1px", padding: 5, paddingLeft: 10, paddingRight: 10}}>Delete</div>
            <div onClick={()=>cancel()} style={{border: "solid 1px", padding: 5, paddingLeft: 10, paddingRight: 10}}>cancel</div>
        </div>
    )
}


const Container = ({
  carteData,
  getById,
  containerTitle,
  containerId,
}: TContener) => {
  return (
    <div
      style={{
        border: " solid 2px black",
        
        width: 300,
        backgroundColor: "lightgray",
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <div
        style={{ border: " solid 2px black", paddingTop: 5, paddingBottom: 5 }}
      >
        {" "}
        {containerTitle}
      </div>
      {carteData.map((i, key) => (
       
          <div key={key} onClick={() => getById(key)}>
            <Carte
              title={i.containerId === containerId && i.title}
              description={i.containerId === containerId && i.description}
            />
 
          </div>
      
      ))}
    </div>
  );
};

const Carte = ({ title, description }: TCarte) => {
  return (
   
      <div
        style={{ backgroundColor: "white", borderRadius: 4, marginBottom: 5, flexGrow: 1}}
      >
        <div>{title}</div>
        <div>{description}</div>
      </div>
     
      
  
  );
};

const Form = ({ addNewTask, updateTask, id, data }: TForm) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [containerId, setContainerId] = useState<number>(1);
  console.log(containerId);
    const actualData = data.find((i, key)=> key ===id) 
    console.log(actualData )
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        gap: 10,
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        margin: "auto",
        backgroundColor: "lightgray",
        padding: 100,
      }}
    >
      <input type={"text"} onChange={(e) => setTitle(e.target.value)} placeholder={actualData && actualData.title}></input>
      <textarea
        rows={5}
        onChange={(e) => setDescription(e.target.value) }
        placeholder={actualData && actualData.description}
      ></textarea>

      <div>
        <CheckboxSTM getId={(value) => setContainerId(value)} data = {actualData}/>
      </div>
      <button onClick={() => id ?updateTask({ title, description, containerId }) :  addNewTask({ title, description, containerId })}>
       {id ? "update" : "Add"} 
      </button>
    </div>
  );
};

const CheckboxSTM = ({ getId, data }: TCheckboxSTM) => {
  const [checkboxData, setCheckboxData] = useState([
    { id: 0, checked: false, name: "bolg1" },
    { id: 1, checked: false, name: "bolg1" },
    { id: 2, checked: false, name: "bolg1" },
    { id: 3, checked: false, name: "bolg1" },
  ]);

  console.log(checkboxData);

  const checkboxes = checkboxData.map((i, key) => (
    <input
      key={key}
      type="checkbox"
      checked={i.id === data?.containerId ? true :i.checked}
      onChange={(e) => {
        const reset = checkboxData.map((itemI) => {
          return { ...itemI, checked: false };
        });

        setCheckboxData(reset);

        const isSelected = checkboxData.map((itemI) => {
          if (itemI === i) {
            return { ...itemI, checked: true };
          } else {
            return { ...itemI, checked: false };
          }
        });
        setCheckboxData(isSelected);
        getId(i.id);
      }}
    />
  ));

  return <div>{checkboxes}</div>;
};