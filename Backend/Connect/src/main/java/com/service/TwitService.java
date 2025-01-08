package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Entity.Twit;
import com.Entity.User;
import com.Exception.TwitException;
import com.Exception.UserException;
import com.request.TwitReplyRequest;

public interface TwitService 
{
	public Twit createTwit(Twit req,User user) throws UserException;
	public List<Twit> findAllTwit();
	public Twit retwit(Long twitId,User user)throws UserException,TwitException;
	public Twit findById(Long twitId) throws TwitException;
	public void deleteTwitById(Long twitId,Long UserId) throws TwitException,UserException;
//	public Twit removeFromRetwit(Long twitId,User user)throws TwitException,UserException;
	public Twit createReply(TwitReplyRequest req,User user)throws TwitException;
	public List<Twit> getUserTwit(User user);
	public List<Twit> findByLikesContainsUser(User user);
	
}
