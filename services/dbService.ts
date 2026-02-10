
export const dbService = {
  saveMessage: (message: any) => {
    const messages = JSON.parse(localStorage.getItem('siri_messages') || '[]');
    messages.push({ ...message, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('siri_messages', JSON.stringify(messages));
  },
  
  registerUser: (userData: any) => {
    const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
    if (users.find((u: any) => u.email === userData.email)) {
      return { success: false, message: 'User already exists' };
    }
    users.push({ ...userData, id: Date.now() });
    localStorage.setItem('siri_users', JSON.stringify(users));
    return { success: true };
  },

  loginUser: (credentials: any) => {
    const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  }
};
