

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jdk.nashorn.internal.parser.JSONParser;

/**
 * Servlet implementation class AutoCompleteUser
 */
@WebServlet("/AutoCompleteUser")
public class AutoCompleteUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AutoCompleteUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		String query="select * from users where uid like ? or name like ? or phone like ?;";
		HttpSession session = request.getSession();
		if(session.getAttribute("id") == null) { //not logged in
			response.sendRedirect("LoginServlet");
		}
		String userid = (String) session.getAttribute("id");

		String start_str = request.getParameter("term");
		System.out.println(start_str);
		List<List<Object>> res = DbHelper.executeQueryList(query, 
				new DbHelper.ParamType[] {DbHelper.ParamType.STRING,
						DbHelper.ParamType.STRING,
						DbHelper.ParamType.STRING
						}, 
				new String[] {"%" + start_str + "%","%" + start_str + "%","%" + start_str + "%"
						});
		int i=0;
		String result_array="[";
		int k=(int)(res.size());
		System.out.println("asd");
	    System.out.println(res);
		while(i<k) {
			int j=0;
			int t=(int)(res.get(i).size());
			result_array+="{"+"\"label\": \"";
			while(j<t) {
				if(j==t-1) {
					result_array+=res.get(i).get(j);
				}
				else {
					result_array+=res.get(i).get(j)+" ";
				}
				
				j=j+1;
			}
			if(i==k-1) {
				result_array+="\", \"value\": \""+res.get(i).get(0)+"\"}";
			}
			else {
				result_array+="\", \"value\": \""+res.get(i).get(0)+"\"},";	
			}
			i=i+1;
		}
		result_array+="]";
		System.out.println(result_array);
		
		PrintWriter out = response.getWriter();
		out.print(result_array);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
