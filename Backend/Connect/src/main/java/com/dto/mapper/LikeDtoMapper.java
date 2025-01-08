package com.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.Entity.Like;
import com.Entity.User;
import com.dto.LikeDto;
import com.dto.TwitDto;
import com.dto.UserDto;

public class LikeDtoMapper 
{
	public static LikeDto toLikeDto(Like like, User reqUser) {
	    if (like == null) {
	        System.out.println("Null Like object provided!");
	        return null;
	    }

	    // Map User
	    UserDto userDto = null;
	    if (like.getUser() != null) {
	        userDto = UserDtoMapper.toUserDto(like.getUser());
	        System.out.println("Mapped UserDto: " + userDto);
	    } else {
	        System.out.println("User in Like is null for Like ID: " + like.getId());
	    }

	    // Map Twit
	    TwitDto twitDto = null;
	    if (like.getTwit() != null) {
	        twitDto = TwitDtoMapper.toTwitDto(like.getTwit(), reqUser);
	        System.out.println("Mapped TwitDto: " + twitDto);
	    } else {
	        System.out.println("Twit in Like is null for Like ID: " + like.getId());
	    }

	    // Create LikeDto
	    LikeDto likeDto = new LikeDto();
	    likeDto.setId(like.getId());
	    likeDto.setUser(userDto);
	    likeDto.setTwit(twitDto);

	    System.out.println("Final LikeDto: " + likeDto);
	    return likeDto;
	}

	public static List<LikeDto> toLikeDtos(List<Like>likes,User reqUser)
	{
		List<LikeDto> likeDtos=new ArrayList<>();
		for(Like like:likes)
		{
			UserDto user=UserDtoMapper.toUserDto(like.getUser());
			TwitDto twit=TwitDtoMapper.toTwitDto(like.getTwit(), reqUser);

			LikeDto likeDto=new LikeDto();
			likeDto.setId(like.getId());
			likeDto.setTwit(twit);
			likeDto.setUser(user);
			likeDtos.add(likeDto);
		}
		return likeDtos;
	}

}
