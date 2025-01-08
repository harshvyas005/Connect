package com.util;

import com.Entity.Like;
import com.Entity.Twit;
import com.Entity.User;

public class TwitUtil 
{
	public final static boolean isLikedByReqUser(User reqUser,Twit twit)
	{
		if (twit == null || reqUser == null || twit.getLikes() == null) 
		 {
	          return false;
	     }
		for(Like like:twit.getLikes())
		{
			if(like != null && like.getUser() != null &&like.getUser().getId().equals(reqUser.getId()))
			{
				return true;
			}
		}
		return false;
	}
	public final static boolean isRetwitedByReqUser(User reqUser,Twit twit)
	{
	     if (twit == null || reqUser == null || twit.getRetwitUser() == null) 
	     {
	          return false;
	     }
		for(User user:twit.getRetwitUser())
		{
			if(user != null && user.getId().equals(reqUser.getId()))
			{
				return true;
			}
		}
		return false;
	}
	
}
