package com.service;

import java.util.List;

import com.Entity.Like;
import com.Entity.Twit;
import com.Entity.User;
import com.Exception.TwitException;
import com.Exception.UserException;

public interface LikeService 
{
	public Like likeTwit(Long twitId,User user)throws UserException,TwitException;
	public List<Like> getAllLikes(Long twitId) throws TwitException;

}
