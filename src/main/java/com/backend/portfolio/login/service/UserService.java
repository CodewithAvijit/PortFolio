package com.backend.portfolio.login.service;

import java.util.List;

import com.backend.portfolio.login.dao.UserRequest;
import com.backend.portfolio.login.dao.UserUpdate;
import com.backend.portfolio.login.entity.Users;


public interface UserService {
    List<Users> allUsers();
    Users creatUsers(UserRequest userRequest);
    void updatUserspassword(UserUpdate userUpdate);

}
