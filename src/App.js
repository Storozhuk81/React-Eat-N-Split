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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setVisibleAddFriend((currVisibleAddFriend) => !currVisibleAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setVisibleAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((currSelected) => (currSelected?.id === friend.id ? null : friend));
    setVisibleAddFriend(false);
  }

  return (
    <div className="app">
      <ListOfFriends
        friends={friends}
        selectedFriend={selectedFriend}
        visibleAddFriend={visibleAddFriend}
        setVisibleAddFriend={setVisibleAddFriend}
        onShowAddFriend={handleShowAddFriend}
        onHandleAddFriend={handleAddFriend}
        onSelection={handleSelection}
      />

      {selectedFriend && <SplitBillForm selectedFriend={selectedFriend} />}
    </div>
  );
}

function ListOfFriends({ friends, selectedFriend, visibleAddFriend, onShowAddFriend, onHandleAddFriend, onSelection }) {
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
        {friends &&
          friends.length !== 0 &&
          friends.map((friend) => (
            <Friend key={friend.id} selectedFriend={selectedFriend} friend={friend} onSelection={onSelection}></Friend>
          ))}
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

function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {friend.balance}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
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

function SplitBillForm({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input id="bill" type="text" name="bill" value=""></input>
      <label htmlFor="your-expense">🧍‍♀️ Your expense</label>
      <input id="your-expense" type="text" name="your-expense" value=""></input>
      <label htmlFor="friend-expense">👫 {selectedFriend.name}'s expense</label>
      <input id="friend-expense" type="text" name="friend-expense" value="" disabled></input>
      <label htmlFor="payer">🤑 Who is paying the bill</label>
      <select id="payer" value="You">
        <option>You</option>
        <option>{selectedFriend.name}</option>
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
