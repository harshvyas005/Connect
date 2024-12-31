package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.User;
import com.Exception.UserException;
import com.dto.UserDto;
import com.dto.mapper.UserDtoMapper;
import com.service.UserService;
import com.util.UserUtil;

@RestController
@RequestMapping("/api/users")
public class UserController 
{
	@Autowired
	private UserService userService;
	
//	@Autowired
//	com.dto.util.UserUtil util;

	@GetMapping("/profile")
	public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization")String jwt)throws UserException
	{
		User user=userService.findUserProfileByJwt(jwt);
		UserDto userDto=UserDtoMapper.toUserDto(user);
		userDto.setReq_user(true);
		
		return new ResponseEntity<UserDto>(userDto,HttpStatus.ACCEPTED);
	}
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Long userId,
			@RequestHeader("Authorization")String jwt)throws UserException
	{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.findUserById(userId);
		UserDto userDto=UserDtoMapper.toUserDto(user);
		userDto.setReq_user(UserUtil.isReqUser(reqUser, user));
		userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
		
		return new ResponseEntity<UserDto>(userDto,HttpStatus.ACCEPTED);
	}
	@GetMapping("/search/{userId}")
	public ResponseEntity<List<UserDto>> searchUserById(@RequestParam String query,
			@PathVariable Long userId,
			@RequestHeader("Authorization")String jwt)throws UserException
	{
		User reqUser=userService.findUserProfileByJwt(jwt);
		List<User> users=userService.searchUser(query);
		List<UserDto> userDtos=UserDtoMapper.toUserDtos(users);
		
		return new ResponseEntity<>(userDtos,HttpStatus.ACCEPTED);
	}
	@PutMapping("/update")
	public ResponseEntity<UserDto> searchUser(@RequestBody User req,
			@RequestHeader("Authorization")String jwt)throws UserException
	{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.updateUser(reqUser.getId(), req);
		UserDto userDto=UserDtoMapper.toUserDto(user);
		
		return new ResponseEntity<>(userDto,HttpStatus.ACCEPTED);
	}
	@PutMapping("/{userId}/follow")
	public ResponseEntity<UserDto> followUser(@PathVariable Long userId,
			@RequestHeader("Authorization")String jwt)throws UserException
	{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.followUser(userId, reqUser);
		UserDto userDto=UserDtoMapper.toUserDto(user);
		userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
		return new ResponseEntity<>(userDto,HttpStatus.ACCEPTED);
	}
	
	
}
