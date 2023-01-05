package edu.kh.farmfarm.api.service;

import java.io.IOException;
import java.util.List;

import edu.kh.farmfarm.api.vo.APIVO;

public interface APIService {

	List<APIVO> foodList(int cp) throws IOException, Exception;

}
