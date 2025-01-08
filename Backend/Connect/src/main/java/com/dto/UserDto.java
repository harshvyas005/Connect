package com.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UserDto 
{
	Long id;
	String fullName;
	String email;
	String image;
	String location;
	String website;
	String birthDate;
	String mobile;
	String backgroundImage;
	String bio;
	boolean req_user;
	boolean login_with_google;
	List<UserDto> followers=new ArrayList<>();
	List<UserDto>following=new ArrayList<>();
	boolean followed;
	boolean isVerified;
	

}
