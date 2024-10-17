import "./index.css";
import { useState } from "react";

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
  const [visibleAddFriend, setVisibleAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setVisibleAddFriend((currVisibleAddFriend) => !currVisibleAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setVisibleAddFriend(false);
  }

  return (
    <div className="app">
      <ListOfFriends
        friends={friends}
        visibleAddFriend={visibleAddFriend}
        setVisibleAddFriend={setVisibleAddFriend}
        onShowAddFriend={handleShowAddFriend}
        onHandleAddFriend={handleAddFriend}
      />
      <SplitBillForm friend="Antony" />
    </div>
  );
}

function ListOfFriends({
  friends,
  // setFriends,
  visibleAddFriend,
  onShowAddFriend,
  onHandleAddFriend,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
    onHandleAddFriend(newFriend);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends && friends.length !== 0 && friends.map((friend) => <Friend key={friend.id} friend={friend}></Friend>)}
      </ul>
      {visibleAddFriend && (
        <AddFriendForm
          name={name}
          image={image}
          onHandleSubmit={handleSubmit}
          setName={setName}
          setImage={setImage}
          // setFriends={setFriends}
        />
      )}
      <Button onClick={onShowAddFriend}>{visibleAddFriend ? "Close" : "Add friend"}</Button>
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

function AddFriendForm({ name, image, setImage, setName, onHandleSubmit }) {
  return (
    <form className="form-add-friend" onSubmit={onHandleSubmit}>
      <label htmlFor="name">👫 Friend name</label>
      <input id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
      <label htmlFor="name">🌄 Image URL</label>
      <input id="url" type="url" name="url" value={image} onChange={(e) => setImage(e.target.value)}></input>
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
      <input id="friend-expense" type="text" name="friend-expense" value="" disabled></input>
      <label htmlFor="payer">🤑 Who is paying the bill</label>
      <select id="payer" value="You">
        <option>You</option>
        <option>{friend}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
