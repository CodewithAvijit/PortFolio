package com.backend.portfolio.login.service;

import java.util.List;

import org.apache.catalina.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.portfolio.login.dao.UserDao;
import com.backend.portfolio.login.dao.UserRequest;
import com.backend.portfolio.login.dao.UserUpdate;
import com.backend.portfolio.login.entity.Authority;
import com.backend.portfolio.login.entity.Users;

@Service
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserDao userdDao, PasswordEncoder passwordEncoder) {
        this.userDao = userdDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Users> allUsers() {
        return userDao.findAll();
    }

    @Override
    public Users creatUsers(UserRequest userRequest) {
        Users users = new Users();
        users.setEmail(userRequest.getEmail());
        users.setAuthority(new Authority(userRequest.getRole()));
        users.setEnabled(true);
        users.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        Authority authority = new Authority();
        authority.setRole(userRequest.getRole());
        authority.setUser(users);
        users.setAuthority(authority);
        return userDao.save(users);
    }
    @Override
    public void updatUserspassword(UserUpdate userUpdate){
        Users existUsers=userDao.findByEmail(userUpdate.getEmail()).get();
        if(existUsers==null){
            throw new RuntimeException("EMAIL IS NOT EXISTED");
        }
        if(!passwordEncoder.matches(userUpdate.getPassword(),existUsers.getPassword())){
             throw new RuntimeException("Old password wrong");
        }
        existUsers.setPassword(passwordEncoder.encode(userUpdate.getNewpassword()));
        userDao.save(existUsers);
    }

}
