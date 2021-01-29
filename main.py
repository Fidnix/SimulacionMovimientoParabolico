def somecool(x):
    return (x**2-3*x+2)/(x**2-3*x)

def somecoolwithy(y):
    return [(3*y-3+(9*y**2-14*y+5)**.5)/(2*y-2), (3*y-3-(9*y**2-14*y+5)**.5)/(2*y-2)]
    pass

# for i in range(-100, 100):
#     try:
#         print(f"x= {i/10} | y= {somecool(i/10)}")
#     except ZeroDivisionError:
#         print(f"Cuando x= {i/10} se produce una division entre cero")

print(f"y= {1/9} | y1= {somecoolwithy(1/9)[0]}, y2= {somecoolwithy(1/9)[1]}")
# for i in range(-100, 100):
#     try:
#         print(f"x= {i/10} | y= {somecool(i/10)}")
#     except ZeroDivisionError:
#         print(f"Cuando x= {i/10} se produce una division entre cero")