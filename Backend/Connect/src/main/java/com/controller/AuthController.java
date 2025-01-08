package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Config.JwtProvider;
import com.Entity.User;
import com.Entity.Varification;
import com.Exception.UserException;
import com.Repository.UserRepository;
import com.response.AuthResponse;
import com.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController 
{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException
	{
		String email=user.getEmail();
		String password=user.getPassword();
		String fullName=user.getFullName();
		String birthDate=user.getBirthDate();
//		if (birthDate == null || birthDate.trim().isEmpty()) {
//		    throw new UserException("Birthdate is required");
//		}
//		if (!birthDate.matches("\\d{4}-\\d{2}-\\d{2}")) {
//		    throw new UserException("Invalid birthdate format. Use YYYY-MM-DD.");
//		}
		User isEmailExist=userRepository.findByEmail(email);
		if(isEmailExist!=null)
		{
			throw new UserException("Email is already used with another account");
		}
		
		User createdUser=new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setBirthDate(birthDate);
		createdUser.setVerification(new Varification());
		
																																																																																																																																																																																																																																																																																																													userRepository.save(createdUser);
		
		Authentication authentication=authenticate(email, password);
//		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token=jwtProvider.generateToken(authentication);
		
		AuthResponse res=new AuthResponse(token,true);
		
		
		return new ResponseEntity<AuthResponse>(res,HttpStatus.CREATED);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signIn(@RequestBody User user)
	{
		String email=user.getEmail();
		String password=user.getPassword();
		
		Authentication authentication=authenticate(email,password);
		String token=jwtProvider.generateToken(authentication);
		
		AuthResponse res=new AuthResponse(token,true);
		return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);	
	}

	private Authentication authenticate(String email, String password) 
	{
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(email);
		if(userDetails==null)
		{
			throw new BadCredentialsException("inavlid username..");
		}
		if(!passwordEncoder.matches(password, userDetails.getPassword()))
		{
			throw new BadCredentialsException("Invalid username or password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
	}

}
