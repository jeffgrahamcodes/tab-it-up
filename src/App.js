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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <AddFriendForm />
        <Button>Add Friend</Button>
      </div>
      <SplitTabForm />
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm(params) {
  return (
    <form className="add-friend-form">
      <label>Friend Name</label>
      <input type="text" />

      <label>Image URL</label>
      <input type="text" />

      <Button>Add </Button>
    </form>
  );
}

function SplitTabForm(params) {
  return (
    <form className="split-tab-form">
      <h2>Split the tab with FRIEND</h2>

      <label>Tab Amount</label>
      <input type="text" />

      <label>Your Amount</label>
      <input type="text" />

      <label>FRIEND Amount</label>
      <input type="text" disabled />

      <label>Who's Paying?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Split Tab </Button>
    </form>
  );
}
