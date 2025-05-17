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
      </div>
    </div>
  );
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
      <button className="button">Select</button>
    </li>
  );
}
