import { API } from './axios';

export const profileAPI = {
    getProfile(id) {
        return API.get(`profile/${id}`);
    },
    putAvatar(uri) {
        const formdata = new FormData();
        formdata.append('image', {
            type: uri[0].mime || uri[0].type,
            uri: uri[0].uri || uri[0].path,
            name: uri[0].path.split('/').pop(),
            width: uri[0].width,
            height: uri[0].height,
        });

        return API.put('profile/photo', formdata, {
            headers: {
                'API-KEY': '11452ed1-3660-45e9-b8d1-a254f78a41b8',
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

// Добавить возможность находить пользователя по айди

export const authAPI = {
    login(values) {
        const formdata = new FormData();

        formdata.append('email', values.email);
        formdata.append('password', values.password);
        formdata.append('rememberMe', true);

        return API.post('auth/login', formdata);
    },
    logout() {
        return API.delete('auth/login');
    },
    authData() {
        return API.get('auth/me');
    }
}

export const usersAPI = {
    getUsers(page = 1) {
        return API.get(`users?page=${page}&count=20`);
    },
    followUser(id, isFollow) {
        if (isFollow) {
            return API.delete('follow/' + id);
        } else {
            return API.post('follow/' + id);
        }
    },
    getFollow(id) {
        return API.get('follow/' + id);
    }
}

export const chatsAPI = {
    getChats() {
        return API.get(`dialogs?page=1&count=100`);
    },
    getCurrentChat(id, page = 1) {
        return API.get(`dialogs/${id}/messages?page=${page}`);
    },
    sendMessage(id, message) {
        return API.post(`dialogs/${id}/messages`, {
            body: message
        })
    }
}