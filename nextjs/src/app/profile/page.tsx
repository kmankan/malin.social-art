// this page will allow the user to view their profile and what they have created

// User logs in with Clerk
// Clerk sets secure HTTP-only cookies in their browser
// When you make a fetch request to your API route, browsers automatically include these cookies

const fetchProfile = async () => {
  try {
    // retrieve the response from the backend and store in variable
    const response = await fetch('/api/profile');

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    // extract json data from response
    const profile = await response.json();
    // Use the profile data...

  } catch (error) {
    console.error('Error fetching profile:', error);
    // Handle error appropriately
  }
};