import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Jelani',
    image: 'https://i.pravatar.cc/48?img=7',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Zuri',
    image: 'https://i.pravatar.cc/48?img=49',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Deja',
    image: 'https://i.pravatar.cc/48?img=16',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showing) => !showing);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend((showing) => !showing);
  }

  function handleFriendSelect(friend) {
    setSelectedFriend((curr) =>
      curr?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitTab(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onFriendSelect={handleFriendSelect}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && (
          <AddFriendForm onAddFriend={handleAddFriend} />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <SplitTabForm
          selectedFriend={selectedFriend}
          onSplitTab={handleSplitTab}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onFriendSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onFriendSelect={onFriendSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onFriendSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? 'selected' : null}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You {friend.name} owes ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onFriendSelect(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?img=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className="add-friend-form" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add </Button>
    </form>
  );
}

function SplitTabForm({ selectedFriend, onSplitTab }) {
  const [bill, setBill] = useState('');
  const [userAmount, setUserAmount] = useState('');
  const friendAmount = bill ? bill - userAmount : '';
  const [payer, setPayer] = useState('user');

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userAmount) return;
    onSplitTab(payer === 'user' ? friendAmount : -userAmount);
  }

  return (
    <form className="split-tab-form" onSubmit={handleSubmit}>
      <h2>Split the tab with {selectedFriend.name}</h2>

      <label>Bill Amount</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your Amount</label>
      <input
        type="text"
        value={userAmount}
        onChange={(e) =>
          setUserAmount(
            Number(e.target.value) > bill
              ? userAmount
              : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s Amount</label>
      <input type="text" disabled value={friendAmount} />

      <label>Who's Paying?</label>
      <select
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Tab </Button>
    </form>
  );
}
