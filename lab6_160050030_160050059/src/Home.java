
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Servlet implementation class Home
 */
@WebServlet("/Home")
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Home() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("id") == null) { //not logged in
			response.sendRedirect("LoginServlet");
		}
		
		String html = "<html><head><title>Sample Ajax Page</title>" + 
				"    <script src=\"jquery-3.3.1.js\"> </script>" + 
				"    <script src=\"jquery.dataTables.min.js\"></script>" + 
				"    <script src=\"jquery-ui.min.js\"></script>" + 
//				"	 <script src=\"jquery.autocomplete.min.js\"></script>"+
				"    <link rel=\"stylesheet\" href=\"jquery-ui.css\" />" + 
				"    <link rel=\"stylesheet\" href=\"jquery.dataTables.min.css\"/>"+
				"	 <link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\">\r\n" +  
				
				"	 <script src=\"whatasap_home.js\"></script>"
				
				+ "</head>" + 
				"<body>" + 
				"    <button onclick=\"loadTableAsync()\">Home</button><br><br>" +
				"<form ><a href=\"#\" id=\"cc\">Create Conversation</a><br><br></form>"+ 
				"	<input type=\"text\" id=\"user_phone_id\""
				+ "placeholder=\"Search people:\" >" + 			
				
				"    <div id=\"content\">"+ 
				"	 </div> <br><br>" +
				"<form action=\"LogoutServlet\" method=\"GET\">"+
                "<input type=\"submit\" value = \"Logout\">" +
            "</form>"+
				"</body>" + 
				"</html>";
		response.setContentType("text/html");
		response.getWriter().print(html);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
