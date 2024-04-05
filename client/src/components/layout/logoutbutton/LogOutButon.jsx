// Icon
import { IoLogOut } from 'react-icons/io5';
// Dependencies
import { useMutation, useQueryClient } from 'react-query';
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
// Request
import { logoutRequest } from '../../../api/authApi';

export const LogOutButon = ({ componentClass }) => {
    const logoutMutation = useMutation(logoutRequest);

    const QueryClient = useQueryClient();

    const handleLogOut = async () => {
        try {
            await logoutMutation.mutateAsync(Cookies.get('token'), {
                onSuccess: () => {
                    console.log(Cookies.get('token'));
                    Cookies.remove('token');
                    Cookies.remove('role');
                    QueryClient.clear();
                    return <Navigate to='/' />
                }
            });

            // if(logoutMutation.data.response.data === 404 || logoutMutation.data.response === 'UnAuthorzed.'){
            //     console.log(Cookies.get('token'));
            // }
        } catch (error) {
            console.log(error);
        }
    };

	return (
		<button
			className={componentClass}
			type='button'
			role='button'
			onClick={() => {
				handleLogOut();
			}}
		>
			<IoLogOut /> Cerrar Sesion
		</button>
	);
};
