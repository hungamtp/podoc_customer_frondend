import { useRouter } from "next/router";
import * as React from "react";

export interface IGoogleLoginProps {}

export default function GoogleLogin(props: IGoogleLoginProps) {

    const router = useRouter();
    const firebaseConfig = {
        apiKey: "AIzaSyDh-hnxFTj5kaBVSLie1PN2QWj_gKp6JG8",
        authDomain: "tamp-mobile-7a20f.firebaseapp.com",
        projectId: "tamp-mobile-7a20f",
        storageBucket: "tamp-mobile-7a20f.appspot.com",
        messagingSenderId: "958312158896",
        appId: "1:958312158896:web:6feca5db54b980de4b8d75",
        measurementId: "G-1F404HJV5Z"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const authFirebase = getAuth(app);

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(authFirebase, provider)
            .then(async (result) => {
                console.log(result);
                const firebaseToken = await result.user.getIdToken();
                console.log("firebaseToken: ", firebaseToken);
                const loginFirebase = async () => {
                    try {
                        const response = await axios.post('/api/accounts/login/email',
                            {
                                "firebaseToken": firebaseToken
                            }
                        )
                        if (response.data.statusCode === 200) {
                            // giả sử api trả về role
                            localStorage.setItem("roles", "SystemAdmin");
                            localStorage.setItem("accessToken", response.data.data);

                            if (localStorage.getItem('roles') === 'SystemAdmin')
                                navigate('/system-admin/dashboard/app', { replace: true });
                            if (localStorage.getItem('roles') === 'Supplier')
                                navigate('/supplier/dashboard/app', { replace: true });
                            if (localStorage.getItem('roles') === 'Partner')
                                navigate('/partner/dashboard/app', { replace: true });
                            if (localStorage.getItem('roles') === 'Affiliator')
                                navigate('/affiliator/dashboard/app', { replace: true });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                loginFirebase();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <Button onClick={signInWithGoogle}>Google Login</Button>
        </>
    )
  </div>;
}
