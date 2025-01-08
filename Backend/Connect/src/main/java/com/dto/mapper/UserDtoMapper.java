package com.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.Entity.User;
import com.dto.UserDto;

public class UserDtoMapper 
{
	public static UserDto toUserDto(User user) {
	    if (user == null) {
	        System.out.println("Null User provided for mapping!");
	        return null;
	    }

	    System.out.println("Mapping User: " + user);

	    UserDto userDto = new UserDto();
	    userDto.setId(user.getId());
	    userDto.setEmail(user.getEmail());
	    userDto.setFullName(user.getFullName());
	    userDto.setImage(user.getImage());
	    userDto.setBackgroundImage(user.getBackgroundImage());
	    userDto.setBio(user.getBio());
	    userDto.setBirthDate(user.getBirthDate());
	    userDto.setFollowers(toUserDtos(user.getFollowers())); // Check this if null
	    userDto.setFollowing(toUserDtos(user.getFollowings())); // Check this if null
	    userDto.setLogin_with_google(user.isLogin_with_google());
	    userDto.setLocation(user.getLocation());
	    userDto.setWebsite(user.getWebsite());

	    System.out.println("Mapped UserDto: " + userDto);
	    return userDto;
	}


	public static List<UserDto> toUserDtos(List<User> followers) 
	{
		List<UserDto> userDtos=new ArrayList<>();
		for(User user:followers)
		{
			UserDto userDto=new UserDto();
			userDto.setId(user.getId());
			userDto.setEmail(user.getEmail());
			userDto.setFullName(user.getFullName());
			userDto.setImage(user.getImage());
			userDtos.add(userDto);
		}
		return userDtos;
	}

}
