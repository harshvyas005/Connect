package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.Twit;
import com.Entity.User;
import com.Exception.TwitException;
import com.Exception.UserException;
import com.dto.TwitDto;
import com.dto.mapper.TwitDtoMapper;
import com.request.TwitReplyRequest;
import com.response.ApiResponse;
import com.service.TwitService;
import com.service.UserService;

@RestController
@RequestMapping("/api/twits")
public class TwitController 
{
	@Autowired
	private TwitService twitService;

	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req,
			@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		Twit twit=twitService.createTwit(req, user);
		TwitDto twitDto=TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	@PostMapping("/reply")
	public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyRequest req,
			@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
	    System.out.println("Reply endpoint hit with request: " + req);
		User user=userService.findUserProfileByJwt(jwt);
		Twit twit=twitService.createReply(req, user);
		TwitDto twitDto=TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	@PutMapping("/{twitId}/retwit")
	public ResponseEntity<TwitDto> retwit(@PathVariable Long twitId,
			@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		Twit twit=twitService.retwit(twitId, user);
		TwitDto twitDto=TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	@GetMapping("/{twitId}")
	public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitId,
			@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		Twit twit=twitService.findById(twitId);
		TwitDto twitDto=TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	@DeleteMapping("/{twitId}")
	public ResponseEntity<ApiResponse> deleteTwit(@PathVariable Long twitId,
			@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		twitService.deleteTwitById(twitId, user.getId());
		ApiResponse res=new ApiResponse();
		res.setMessage("Twit deleted Successfully");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	@GetMapping("/")
	public ResponseEntity<List<TwitDto>> getAllTwits(@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		List<Twit> twits=twitService.findAllTwit();
		System.out.println("twits:"+twits);
		List<TwitDto> twitDto=TwitDtoMapper.toTwitDtos(twits, user);
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<TwitDto>> getUsersAllTwits(@PathVariable Long userId
			,@RequestHeader("Authorization")String jwt)throws UserException,TwitException
	{
		User user=userService.findUserProfileByJwt(jwt);
		List<Twit> twits=twitService.getUserTwit(user);
		List<TwitDto> twitDto=TwitDtoMapper.toTwitDtos(twits, user);
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	@GetMapping("/user/{userId}/likes")
	public ResponseEntity<List<TwitDto>> findTwitByLikesContainsUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) 
			throws UserException{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.findUserById(userId);
		if (user == null) {
		    throw new UserException("User not found");
		}
		List<Twit> twits=twitService.findByLikesContainsUser(user);
		System.out.println("Twits found: " + twits.size());
		twits.forEach(twit -> System.out.println("Twit Content: " + twit.getContent()));
		List<TwitDto> twitDtos=TwitDtoMapper.toTwitDtos(twits,reqUser);
		return new ResponseEntity<List<TwitDto>>(twitDtos,HttpStatus.OK);
	}
	
	
	
	
}
