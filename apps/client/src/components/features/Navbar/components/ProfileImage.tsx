import { useUserStore } from '../../../../stores/user';

export default function ProfileImage() {
  const { user } = useUserStore();

  if (user?.imageUrl) {
    return (
      <img
        className="rounded-full border-2 border-gray-300 cursor-pointer w-14 h-14"
        src={user.imageUrl}
        alt="avatar"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <img
      className="rounded-full border-2 border-gray-300 cursor-pointer w-14 h-14"
      src={
        'https://jacksonandmorris.co.uk/wp-content/uploads/2017/04/default-user.png'
      }
      alt="avatar"
      referrerPolicy="no-referrer"
    />
  );
}
