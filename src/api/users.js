const API_BASE_URL = `${process.env.API_URL}/api/user`;

export async function getUserData(id) {
  let res = {};
  try {
    res = await fetch(`${API_BASE_URL}/${id}`);
  } catch (e) {
    console.log(e);
  }
  const user = await res.json();
  return user;
}
