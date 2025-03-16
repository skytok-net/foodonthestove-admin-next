// should be an instance of user-collection.tsx which is a table and this should have common filter components representing common types of searches
// also should have a search bar, a way to invite users via a popup, and a way to edit users using a sheet sliding out from the right
import UserCollection from './user-collection';
export default function UserContent() {
  return (
    <div>
      <UserCollection />
    </div>
  );
}   