package com.Config;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter 
{
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException 
	{
		String jwt=request.getHeader(jwtConstant.JWT_HEADER);
		System.out.println("token:"+jwt);
		
		if(jwt!=null && jwt.startsWith("Bearer "))
		{
			jwt=jwt.substring(7);
			try 
			{
					SecretKey key=Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
					Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
					String email = claims.get("email", String.class);
					String authorities = claims.get("authorities", String.class);
//					String email=String.valueOf(claims.get("email"));
//					String authorities=String.valueOf(claims.get("authorities"));


					
					if (authorities != null && !authorities.isEmpty()) 
					{
						List<GrantedAuthority> auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
						Authentication authenticationToken=
						new UsernamePasswordAuthenticationToken(email,null, auths);
						SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					}
					else
					{
	                    throw new BadCredentialsException("No authorities found in token.");

					}
			}
			catch (Exception e) 
			{
				e.printStackTrace();
				throw new BadCredentialsException("inavlid token..");
			}
				
		}
		filterChain.doFilter(request, response);

	}



}
