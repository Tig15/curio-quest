import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getUserData = <P extends object>(
  WrappedComponent: React.ComponentType<P & {userData: any}>,
) => {
  const WithUserData: React.FC<P> = props => {
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: '',
    });

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const currentUser = auth().currentUser;

          if (currentUser) {
            const userId = currentUser.uid;
            const userSnapshot = await firestore()
              .collection('users')
              .doc(userId)
              .get();

            if (userSnapshot.exists) {
              const userDataFromDB = userSnapshot.data();
              setUserData({
                username: userDataFromDB?.username || '',
                email: userDataFromDB?.email || '',
                password: userDataFromDB?.password || '',
              });
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, []);

    return <WrappedComponent {...props} userData={userData} />;
  };

  return WithUserData;
};

export default getUserData;
