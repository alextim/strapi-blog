// import qs from 'qs';

const baseUrl = process.env.BASE_URL || 'http://localhost:1337';

const fetchQuery = async (path, params = null) => {
  let url;
  if (params !== null) {
    url = `${baseUrl}/api/${path}/${params}`;
  } else {
    url = `${baseUrl}/api/${path}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

function HomePage({ posts }) {
  return (
    <div css={{ color: 'blue' }}>
      <h1>Welcome to Next.js!</h1>
      {posts?.map(({ attributes: { title } }) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  /*
  const query = qs.stringify({
    populate: [
      'tags',
    ],
  }, {
    encodeValuesOnly: true,
  });
*/
  const query = null;
  const posts = await fetchQuery('posts', query);

  return {
    props: {
      posts: posts ? posts.data : null,
    },
  };
}
