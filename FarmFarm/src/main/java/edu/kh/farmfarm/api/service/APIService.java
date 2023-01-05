package edu.kh.farmfarm.api.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.api.vo.APIVO;

public interface APIService {

	Map<String, Object> foodList(int cp, Map<String, Object> pm) throws IOException, Exception;

}
