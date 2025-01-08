package com.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.Entity.Like;

import lombok.Data;

@Data
public class TwitDto 
{
	private Long id;
	private String content;
	private String image;
	private String video;
	private UserDto user;
	private LocalDateTime createAt;
	private Integer totalLikes;
	private Integer totalReplies;
	private Integer totalRetwits;
	private boolean isLiked;
	private boolean isRetwit;
	private List<Long> retwitUsersId;
	private List<TwitDto> replyTwits;
	private List<Long> likedTwitUsersId;
	

}
