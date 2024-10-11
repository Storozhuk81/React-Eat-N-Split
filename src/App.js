import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <ListOfFriends friends={initialFriends} />
      <SplitBillForm friend="Antony" />
    </div>
  );
}

function ListOfFriends({ friends }) {
  return (
    <div className="sidebar">
      <ul>
        {friends && friends.length !== 0 && friends.map((friend) => <Friend key={friend.id} friend={friend}></Friend>)}
      </ul>
      <Button>Add friend</Button>
      <AddFriendForm />
    </div>
  );
}

function Friend({ friend: { name, image, balance } }) {
  return (
    <li className="">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}€
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owe you {balance}€
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label htmlFor="name">👫 Friend name</label>
      <input id="name" type="text" name="name" value=""></input>
      <label htmlFor="name">🌄 Image URL</label>
      <input id="url" type="url" name="url" value="https://i.pravatar.cc/48"></input>
      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input id="bill" type="text" name="bill" value=""></input>
      <label htmlFor="your-expense">🧍‍♀️ Your expense</label>
      <input id="your-expense" type="text" name="your-expense" value=""></input>
      <label htmlFor="friend-expense">👫 {friend}' expense</label>
      <input id="friend-expense" type="text" name="friend-expense" value=""></input>
      <label htmlFor="payer">🤑 Who is paying the bill</label>
      <select id="payer" value="You">
        <option>You</option>
        <option>{friend}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
