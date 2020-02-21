from PyPDF2 import PdfFileReader

if __name__ == "__main__":
    input1 = PdfFileReader(
        open("./pdf/A78970-2_Supplemental_ESA_-_Part_1_of_3_-_A5E4Z2.pdf", 'rb'))
    size = input1.getPage(0).mediaBox
    print(size.getWidth(), size.getHeight())

# table_areas accepts strings of the form x1,y1,x2,y2
# where (x1, y1) -> top-left and (x2, y2) -> bottom-right in PDF coordinate space.
# In PDF coordinate space, the bottom-left corner of the page is the origin, with coordinates (0, 0).
