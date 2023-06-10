export default function() {
  return (
      <div className='min-h-screen  grow bg-gray-50 dark:bg-black'>
        <UserCard
          author ={author}
          key={author.id}
        />
        <hr className='mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10' />
        <div>
          {bleatsByAuthor.map((bleat) => (
            <BleatCard
              bleat={bleat}
              key={bleat.id}
              setBleats={setBleatsByAuthor}
            />
          ))}
        </div>
      </div>
  );
}

