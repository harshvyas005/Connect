package com.Config;

import java.util.Date;
import static java.lang.System.currentTimeMillis;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider 
{
	SecretKey key=Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
	public String generateToken(Authentication auth)
	{
//		 String authorities = auth.getAuthorities().stream()
//                 				.map(GrantedAuthority::getAuthority)
//                 				.collect(Collectors.joining(","));
				 
		 String authorities= auth.getAuthorities().toString();
				 
				 
				 

		 
		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+86400000))
				.claim("email",auth.getName())
				.claim("authorities", authorities)
				.signWith(key)
				.compact();
	}
	public String getEmailFromToken(String jwt)
	{
		jwt=jwt.substring(7);
		Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email=String.valueOf(claims.get("email"));
		return email;
	}


}
